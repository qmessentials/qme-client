import Image from 'next/image'
import Link from 'next/link'

export interface NavImage {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface NavItem {
  label: string
  url: string
}

export interface NavParams {
  image?: NavImage
  bannerText?: string
  items?: NavItem[]
}

export default function Nav({ image, bannerText, items }: NavParams) {
  return (
    <nav className="flex items-left justify-between flex-wrap bg-gray-400 p-3">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/"> {image ? <Image src={image.src} alt={image.alt} width={image.width} height={image.height} /> : <></>}</Link>
        {bannerText ? <span className="font-semibold text-3xl ml-4">{bannerText}</span> : <></>}
      </div>
      {items ? (
        <>
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-200 hover:border-gray-200">
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>

          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              {items.map((item) => (
                <Link className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4" key={item.label} href={item.url}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </nav>
  )
}
