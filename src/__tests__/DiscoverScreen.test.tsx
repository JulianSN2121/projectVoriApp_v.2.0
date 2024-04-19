// Mock für die navigation-Prop
//const createTestProps = (props: Object) => ({
//  navigation: {
//    navigate: jest.fn()
//  },
//  ...props
//});

//const testProps = createTestProps({});

function test2(a: number) {
  return a + 1;
}

describe("Test", () => {
  expect(test2(5)).toBe(6);
})

//describe('DiscoverScreen', () => {
//  it('renders correctly', () => {
//    const { getByText } = render(<DiscoverScreen navigation={testProps} />);
//    expect(getByText('Entdecke Vorarlberg')).toBeTruthy();
//  });
//});