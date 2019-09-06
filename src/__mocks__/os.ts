// eslint-disable-next-line @typescript-eslint/no-explicit-any
const overRide:any = jest.genMockFromModule('os');
overRide.homedir =  ():string => "/Users/jam"

export default overRide