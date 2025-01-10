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
      <div className="flex flex-col space-y-8">
        <HomeSvgComp />
        <div className='flex flex-row items-start justify-start ml-8' onClick={() => handleClick()}>
          <ArrowRightIcon name={"Click here to know more about Competencies"} />
        </div>
      </div>
    </>
  )
}

export default Index