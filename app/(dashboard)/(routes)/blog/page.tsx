import Blogcomponent from '@/components/Blogcomponent'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <section className="w-full flex flex-col items-center px-20 pt-20 pb-10">
      <article className="flex flex-col my-4">
        
        <Link href="#" className="hover:opacity-75">
            <Image src="/images/Screenshot (247).png"
                width={192}
                height={50} 
                alt="magees"
                className='!w-11/12'/>
        </Link>
        <div className="bg-white flex flex-col justify-start p-6">
            <Link href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">Technology</Link>
            <Link href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</Link>
            <p className="text-sm pb-3">
                By <Link href="#" className="font-semibold hover:text-gray-800">David Grzyb</Link>, Published on April 25th, 2020
            </p>
            <Link href="#" className="pb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis porta dui. Ut eu iaculis massa. Sed ornare ligula 
              lacus, quis iaculis dui porta volutpat. In sit amet posuere magna Lorem ipsum dolor, sit amet consectetur adipisicing elit.
               Voluptatibus, officiis. Quas cum id sint quo unde sapiente soluta voluptatum cumque.
               <br/>
               <br/>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, deserunt eos. Quam consectetur obcaecati corrupti possimus
               adipisci quo dignissimos pariatur, similique repellendus voluptates quasi excepturi delectus nisi a consequuntur voluptatum?
               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos rem alias quia architecto quod autem aliquid beatae repellat 
               soluta laborum perspiciatis quae, praesentium corrupti tempora tempore aspernatur magni. Porro quisquam in modi, odit distinctio 
               facilis sunt excepturi dolore delectus veniam doloribus cupiditate temporibus voluptatum nostrum voluptatem repellendus eveniet, 
               corporis omnis! Impedit incidunt ullam itaque reprehenderit error maiores sit beatae accusantium placeat nemo in doloribus commodi 
               asperiores deleniti eius quidem, perferendis distinctio veniam tenetur? Ab molestias nobis placeat, repellendus molestiae est. 
               Aut exercitationem, consectetur ab quis ut officia, corporis minus quo assumenda nam cum natus nostrum non doloremque aliquam dicta quidem.

               <br/>
               <br/>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit corporis dolore eveniet pariatur nobis distinctio voluptate magnam consectetur 
               assumenda. Voluptas unde a maiores odio. Commodi, cumque totam. Quibusdam asperiores a facere iste aliquam atque numquam est impedit molestiae 
               sunt ex exercitationem natus harum, laudantium voluptas unde alias error recusandae fugiat qui labore velit! Voluptatem totam harum tenetur repellat! 
               Illo, quisquam repudiandae ab, quasi ipsum, eius minima incidunt nostrum quaerat laborum soluta aliquam unde aspernatur a. Aut magni voluptate iusto 
               quo nisi atque, aspernatur quia! Eveniet porro tenetur, consectetur veritatis, fugiat hic nemo cum praesentium officia modi excepturi veniam cupiditate!
                Quisquam.
            </Link> 
        </div>
      </article>
      <div>
        <h2>(Comments)</h2>
      </div>
      <Blogcomponent />
    </section>
  )
}

export default page