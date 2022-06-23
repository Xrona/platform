import userModule from './user'
import instance from './instance'
import verificationModule from './verification'
import bidModule from './bid'
import objectModule from './object'
import transactionModule from './transaction'
import dealModule from './deal'
import resetModule from './reset'
import documentModule from './document'
import summaryModule from './summary'
import notificationModule from './notification'
import settingsModule from './setting'

export default (context) => {
  return {
    user: userModule(instance(context)),
    verification: verificationModule(instance(context)),
    bid: bidModule(instance(context)),
    object: objectModule(instance(context)),
    transaction: transactionModule(instance(context)),
    deal: dealModule(instance(context)),
    reset: resetModule(instance(context)),
    document: documentModule(instance(context)),
    summary: summaryModule(instance(context)),
    notification: notificationModule(instance(context)),
    setting: settingsModule(instance(context)),
  }
}
