import { GraphqlContext } from '../../graphql-context';
export default {
  Query: {
    customers(root: any, args: any, context: GraphqlContext) {
      return context.api.customer.load
        .loadAllCustomers()
        .then(data => data.customers);
    },
  },
};
