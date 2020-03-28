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
const createTask = async (title, info) => (
  new Promise((resolve, reject) => {
    const generator = storage.TableUtilities.entityGenerator
    const task = {
      PartitionKey: generator.String('task'),
      RowKey: generator.String(uuid.v4()),
      title,
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
      .select(['title', 'info'])
      .where('PartitionKey eq ?', 'task')
    
    service.queryEntities(table, query, null, (error, result, response) => {
      !error ? resolve(result.entries.map((entry) => ({
        title: entry.title._,
        info: entry.title._
        
      }))) : reject()
    })
  })
)

module.exports = {
  init,
createTask,
listTasks
}
