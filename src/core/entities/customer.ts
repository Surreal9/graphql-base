import { SaveCustomerResponseError } from '../../boundary/responses/customers';
import { SaveCustomerRequest } from '../../boundary/requests/customers';
import { CustomerGateway } from '../../boundary/customer';
export type CustomerType = {
  name: string;
};

export async function validate(
  request: SaveCustomerRequest,
  gateway: CustomerGateway
): Promise<SaveCustomerResponseError | null> {
  if (!request.name) {
    return SaveCustomerResponseError.INVALID_NAME;
  }

  const cust = await gateway.loadCustomerByName(request);
  if (cust.customer) {
    return SaveCustomerResponseError.DUPLICATE_NAME;
  }

  return null;
}
