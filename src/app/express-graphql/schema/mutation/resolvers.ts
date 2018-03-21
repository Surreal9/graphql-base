import { GraphqlContext } from '../../graphql-context';

export default {
  Mutation: {
    customerSave(root: any, { customer }: any, context: GraphqlContext) {
      return context.api.customer.save.execute(customer);
    },
  },
};
