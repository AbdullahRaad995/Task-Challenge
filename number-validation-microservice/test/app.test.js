const getCarrier = require('../number-info');
const axios = require('axios');
jest.mock('axios');

test('getCarrier returns the carrier name for a valid phone number', async () => {
  const mockData = { carrier: { name: 'ALFAA' } };
  axios.get.mockResolvedValue({ data: mockData });

  const carrierName = await getCarrier('+96176115030');
  console.log(carrierName)
  expect(carrierName).toBe('ALFA');
});