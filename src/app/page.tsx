import NavBar from '@/components/NavBar'
import TopLevel from '@/components/TopLevel'
import Image from 'next/image'

export default function Home() {



  return (
    <>
      <main className='px-4 lg:px-14'>
        <NavBar />
        
        <section>
          <TopLevel />
        </section>
      </main>
    </>
  )
}
