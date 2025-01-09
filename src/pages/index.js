import HomeSvgComp from '@/components/HomeSvgComp'
import { ArrowRightIcon } from '@/components/ui/arrow-right'
import { useRouter } from 'next/router'


function index() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/competency')


  }


  return (

    <>
      <HomeSvgComp />
      <div className='flex flex-row items-center justify-center' onClick={() => handleClick()}>
        <ArrowRightIcon name={"Click here to know more about Competencies"} />
      </div>
    </>
  )
}

export default index