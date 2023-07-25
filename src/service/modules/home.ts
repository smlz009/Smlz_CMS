import $request from '..'

interface IList {
  data: any
  status: Boolean
}

$request
  .request<IList>({
    url: 'home/goodprice',
    interceptors: {
      requestSuccessFn(config) {
        return config
      }
    }
  })
  .then((res) => {
    console.log(res)
  })
