export function Image(props: { src: string }) {
  return (
    <div className='image-item'>
      <img src={props.src} alt='' />
    </div>
  )
}
