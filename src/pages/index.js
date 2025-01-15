import HomeSvgComp from '@/components/HomeSvgComp'
import { ArrowRightIcon } from '@/components/ui/arrow-right'
import { useRouter } from 'next/router'


function Index() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/competency')


  }


  return (

    <>
      <div className="flex flex-col space-y-28 items-center justify-center">
        <HomeSvgComp />
        <div className='flex flex-row items-center justify-center ml-8' onClick={() => handleClick()}>
          <ArrowRightIcon name={"Click here to know more about Competencies"} />
        </div>
      </div>
    </>
  )
}

export default Index