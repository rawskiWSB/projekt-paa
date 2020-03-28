const storage = require('azure-storage')

const retryOperations = new storage.ExponentialRetryPolicyFilter();

const service = storage.createTableService().withFilter(retryOperations)
const table = 'tasks'
const uuid = require('uuid')

const init = async () => (
  new Promise((resolve, reject) => {
    service.createTableIfNotExists(table, (error, result, response) => {
      !error ? resolve() : reject()
    })
  })
)
const createTask = async (title) => (
  new Promise((resolve, reject) => {
    const generator = storage.TableUtilities.entityGenerator
    const task = {
      PartitionKey: generator.String('task'),
      RowKey: generator.String(uuid.v4()),
      title
    }
    service.insertEntity(table, task, (error, result, response) => {
      !error ? resolve() : reject()
    })
  })
)

const createTaskInfo = async (info) => (
  new Promise((resolve, reject) => {
    const generator = storage.TableUtilities.entityGenerator
    const task2 = {
      PartitionKey: generator.String('task2'),
      RowKey: generator.String(uuid.v4()),
      info
    }
    service.insertEntity(table, task, (error, result, response) => {
      !error ? resolve() : reject()
    })
  })
)

const listTasks = async () => (
  new Promise((resolve, reject) => {
    const query = new storage.TableQuery()
      .select(['title'])
      .where('PartitionKey eq ?', 'task')
    
    service.queryEntities(table, query, null, (error, result, response) => {
      !error ? resolve(result.entries.map((entry) => ({
        title: entry.title._
      }))) : reject()
    })
  })
)

const listTasksInfo = async () => (
  new Promise((resolve, reject) => {
    const query = new storage.TableQuery()
      .select(['info'])
      .where('PartitionKey eq ?', 'task2')
    
    service.queryEntities(table, query, null, (error, result, response) => {
      !error ? resolve(result.entries.map((entry) => ({
        info: entry.info._
      }))) : reject()
    })
  })
)

module.exports = {
  init,
createTask,
listTasks,
  listTasksInfo,
  createTaskInfo
}
