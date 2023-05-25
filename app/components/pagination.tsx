

export default function Pagination({ queryString }: { queryString: string }) {
  const urlParams = new URLSearchParams(queryString)
  // const pageNumber = urlParams.get('page')
  console.log(urlParams)

  return (
    <div className='page-numbers'>
      {urlParams}
    </div>
  )
}
