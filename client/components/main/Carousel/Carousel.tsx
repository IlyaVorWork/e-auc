import React, { FunctionComponent, useCallback, useState } from 'react'
import { useStyles } from './Carousel.styles'
import { ArrowRight, ArrowLeft } from '@material-ui/icons'
import { Button } from '@ui/index'

interface ISlideProps {
  image: string
  title: any
  subtitle: any
  button: {
    text: string
    url: string
  }
}

const slides: Array<ISlideProps> = [
  {
    image: '/images/main/carousel/slide1.jpg',
    title: (classes) => (
      <p className={classes.title}>PlayStation 5 уже доступна!</p>
    ),
    subtitle: (classes) => (
      <p className={classes.subtitle}>
        Приобретите новую игровую консоль от Sony уже сейчас
      </p>
    ),
    button: {
      text: 'Купить',
      url: '/products/608050bbbe4b8f36447db7b9',
    },
  },
  {
    image: '/images/main/carousel/slide2.jpg',
    title: (classes) => (
      <p className={classes.title}>Xbox Series X уже доступна!</p>
    ),
    subtitle: (classes) => (
      <p className={classes.subtitle}>
        Испытайте невероятный игровой опыт вместе с новой консолью от Microsoft
      </p>
    ),
    button: {
      text: 'Купить',
      url: '/products/608050e4be4b8f36447db7ba',
    },
  },
  {
    image: '/images/main/carousel/slide3.jpg',
    title: (classes) => (
      <p className={classes.title}>Macbook pro 13 уже доступен!</p>
    ),
    subtitle: (classes) => (
      <p className={classes.subtitle}>
        Достигните небывалых высот производительности вместе с новым поколением
        ноутбуков от Apple
      </p>
    ),
    button: {
      text: 'Купить',
      url: '/products/60805ab9be4b8f36447db7ce',
    },
  },
]

// interface ICarouselProps {
//   autoplay?: boolean
//   duration?: number
// }

const Carousel: FunctionComponent = () => {
  const classes = useStyles()

  const [idx, setIdx] = useState<number>(0)

  const increase = useCallback(
    async () =>
      await setIdx((prevState) =>
        prevState >= slides.length - 1 ? 0 : (idx + 1) % slides.length
      ),
    [idx, setIdx]
  )

  const decrease = useCallback(
    async () =>
      await setIdx((prevState) =>
        prevState <= 0 ? slides.length - 1 : (idx - 1) % slides.length
      ),
    [idx, setIdx]
  )

  // useEffect(() => {
  //   autoplay && setInterval(async () => await increase(), duration || 5200)
  // }, [autoplay, duration, increase])
  // aboba

  return (
    <div className={classes.root}>
      <div
        className={classes.slide}
        style={{
          backgroundImage: `url(${slides[idx]?.image})`,
          backgroundPosition: 'left',
        }}
      >
        <div className={classes.contents}>
          {slides[idx].title(classes)}
          {slides[idx].subtitle(classes)}
          <Button href={slides[idx].button.url} className={classes.button}>
            {slides[idx].button.text}
          </Button>
        </div>
      </div>
      <ArrowLeft onClick={decrease} className={classes.icon} />
      <ArrowRight onClick={increase} className={classes.icon} />
    </div>
  )
}

export default Carousel
