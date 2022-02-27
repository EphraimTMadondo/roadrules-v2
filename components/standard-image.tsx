import Image, { ImageProps } from "next/image";

interface Props extends ImageProps {
}

export function StandardImage ( props: ImageProps ) {

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="relative h-48 w-full overflow-hidden">
        <Image {...props} />
      </div>
    </div>
  )

}