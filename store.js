const storage = require('azure-storage')
const retryOperations = new storage.ExponentialRetryPolicyFilter();

const service = storage.createTableService().withFilter(retryOperations);
const table = 'tasks'

const init = async () => (
  new Promise((resolve, reject) => {
    service.createTableIfNotExists(table, (error, result, response) => {
      !error ? resolve() : reject()
    })
  })
)



module.exports = {
  init
}
