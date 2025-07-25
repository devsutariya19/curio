import React, { ReactNode, ReactElement } from 'react'

export function MdxFrame({ children }: { children: ReactNode }) {
  const childrenArray = React.Children.toArray(children)

  const img = childrenArray.find(
    (child): child is ReactElement<HTMLImageElement> =>
      React.isValidElement(child) && child.type === 'img'
  )
  
  const caption = childrenArray.find(
    (child) => typeof child === 'string' || typeof child === 'number'
  )

  const img_path = `/api/${img?.props.src}`

  if (!img?.props?.src) return null

  return (
    <div className='my-5'>
      <img
        src={img_path}
        alt={img.props.alt ?? ''}
        width={'600'}
        height={'200'}
        className="rounded-t-md"
      />
      {caption && (
        <div className="p-4 text-sm text-muted-foreground italic">
          {caption}
        </div>
      )}
    </div>
  )
}
