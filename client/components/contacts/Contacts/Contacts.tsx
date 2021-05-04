import React, { FunctionComponent, useCallback, useContext } from 'react'
import {
  Grid,
  Hidden,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import Map from '@components/contacts/Map'
import { useStyles } from './Contacts.styles'
import { Accordion, Breadcrumbs, Button, Divider, Input } from '@ui/index'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { makeTicket } from '@utils/account'
import { errorMessage } from '@hooks/auth/errorMessage'
import { useSnackbar } from 'notistack'
import { AppContext } from '@providers/AppProvider'
import { useMutation } from '@apollo/client'
import CREATE_TICKET from '@graphql/mutations/CreateTicket'
import { useStyles as useCarouselStyles } from '@components/main/Carousel/Carousel.styles'

export interface IContactProps {
  name: string
  email: string
  message: string
}

const Contacts: FunctionComponent = () => {
  const classes = useStyles()
  const { state } = useContext(AppContext)
  const { enqueueSnackbar } = useSnackbar()
  const [createTicket] = useMutation(CREATE_TICKET)

  const handleSubmit = useCallback(
    async (values) => {
      enqueueSnackbar('Пожалуйста, подождите', { variant: 'info' })
      const { message, name, email } = values
      try {
        const data = await makeTicket(
          createTicket,
          message,
          name,
          email,
          state.user
        )
        if (!data.createTicket) {
          enqueueSnackbar(errorMessage(data), {
            variant: 'error',
          })
        } else {
          enqueueSnackbar('Сообщение зарегистрировано!', {
            variant: 'success',
          })
        }
      } catch (error) {
        enqueueSnackbar(errorMessage(error), {
          variant: 'error',
        })
      }
    },
    [createTicket, state.user, enqueueSnackbar]
  )

  const initialValues: IContactProps = {
    name: '',
    email: '',
    message: '',
  }

  const validationSchema = yup.object({
    name: yup.string().required('Имя обязательно для заполнения'),
    email: yup
      .string()
      .email('Введите корректный email')
      .required('Email обязателен для заполнения'),
    message: yup
      .string()
      .min(3, 'Минимальная длина сообщения - 3 символа')
      .required('Сообщение не должно быть пустым'),
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    // validateOnMount: true,
  })

  const theme = useTheme()
  const carouselClasses = useCarouselStyles()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Grid
        container
        direction={'column'}
        justify={'flex-start'}
        className={classes.headline}
        spacing={1}
      >
        <Grid item>
          <Breadcrumbs />
        </Grid>
        <Grid item>
          <Typography variant={'h1'}>Контакты</Typography>
        </Grid>
      </Grid>
      <Divider type={'wide'} className={classes.divider} />
      <Grid container direction={'column'} spacing={6} className={classes.root}>
        <Hidden xsDown>
          <Grid item xs={12}>
            <div className={carouselClasses.root}>
              <div
                className={carouselClasses.slide}
                style={{ backgroundImage: `url(/images/about-us/main.jpg)` }}
              >
                <div className={carouselClasses.contents}>
                  <p className={carouselClasses.title}>Покупать онлайн легко</p>
                  <p className={carouselClasses.subtitle}>
                    Окунитесь в безграничный мир электронники и бытовой техники,
                    посетив наш современный онлайн-аукцион!
                  </p>
                  <Button href={'/shop'} className={carouselClasses.button}>
                    В магазин
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        </Hidden>
        <Grid container direction={'column'} spacing={3}>
          <Grid item>
            <Typography
              variant={'h1'}
              paragraph={true}
              align={'center'}
              className={classes.heading}
            >
              ОБ ИНТЕРНЕТ-АУКЦИОНЕ eAUC.
            </Typography>
            <Typography
              variant={'body2'}
              paragraph={true}
              align={'center'}
              className={classes.subHeading}
            >
              Мы предоставляем большой выбор высококачественной бытовой техники
              и электронники, дружелюбный персонал и новомодную систему
              онлайн-аукциона. Наша цель - предоставить вам наилучший опыт
              покупки в интернете!
            </Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              justify={'space-between'}
              alignItems={'center'}
              direction={isSmallWidth ? 'column' : 'row'}
            >
              <Grid
                item
                className={classes.contactContanier}
                xs={isSmallWidth ? 12 : 4}
              >
                <Grid container direction={'column'} spacing={2}>
                  <Grid item>
                    <img
                      src="/images/about-us/1.jpg"
                      alt="Лучшие цены и предложения"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant={'h2'}>
                      Лучшие цены и предложения
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant={'body2'} paragraph={true}>
                      За счёт системы аукционов мы предоставляем потенциальным
                      покупателям наилучшую цену, за которую они будут сражаться
                      путём ставок.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                className={classes.contactContanier}
                xs={isSmallWidth ? 12 : 4}
              >
                <Grid container direction={'column'} spacing={2}>
                  <Grid item>
                    <img
                      src="/images/about-us/2.jpg"
                      alt="Широкий ассортимент"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant={'h2'}>Широкий ассортимент</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant={'body2'} paragraph={true}>
                      Ассортимент более чем из 5000 товаров в 4 разных
                      категориях. Вам обязательно что-нибудь придётся по вкусу.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                className={classes.contactContanier}
                xs={isSmallWidth ? 12 : 4}
              >
                <Grid container direction={'column'} spacing={2}>
                  <Grid item>
                    <img src="/images/about-us/3.jpg" alt="Простой возврат" />
                  </Grid>
                  <Grid item>
                    <Typography variant={'h2'}>Простой возврат</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant={'body2'} paragraph={true}>
                      Не удовлетворены товаром? Оформите возврат и получите свои
                      средства обратно!
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Map />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            justify={'space-between'}
            alignItems={'center'}
            direction={isSmallWidth ? 'column' : 'row'}
          >
            <Grid
              item
              className={classes.contactContanier}
              xs={isSmallWidth ? 12 : 3}
            >
              <Grid container direction={'column'} spacing={2}>
                <Grid item>
                  <img src="/images/contacts/1.jpeg" alt="Главный офис" />
                </Grid>
                <Grid item>
                  <Typography variant={'h2'}>Главный офис</Typography>
                </Grid>
                <Grid item>
                  <Typography variant={'body1'} paragraph={true}>
                    main-office@e-auc.com
                  </Typography>
                  <Typography variant={'body1'} paragraph={true}>
                    Телефон: 8-800-5553-535
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              className={classes.contactContanier}
              xs={isSmallWidth ? 12 : 3}
            >
              <Grid container direction={'column'} spacing={2}>
                <Grid item>
                  <img src="/images/contacts/2.jpeg" alt="Поддержка клиентов" />
                </Grid>
                <Grid item>
                  <Typography variant={'h2'}>Поддержка клиентов</Typography>
                </Grid>
                <Grid item>
                  <Typography variant={'body1'} paragraph={true}>
                    customer-service@e-auc.com
                  </Typography>
                  <Typography variant={'body1'} paragraph={true}>
                    Телефон: 8-800-5553-535
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              className={classes.contactContanier}
              xs={isSmallWidth ? 12 : 3}
            >
              <Grid container direction={'column'} spacing={2}>
                <Grid item>
                  <img src="/images/contacts/3.jpeg" alt="Отдел доставки" />
                </Grid>
                <Grid item>
                  <Typography variant={'h2'}>Отдел доставки</Typography>
                </Grid>
                <Grid item>
                  <Typography variant={'body1'} paragraph={true}>
                    delivery@e-auc.com
                  </Typography>
                  <Typography variant={'body1'} paragraph={true}>
                    Телефон: 8-800-5553-535
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              className={classes.contactContanier}
              xs={isSmallWidth ? 12 : 3}
            >
              <Grid container direction={'column'} spacing={2}>
                <Grid item>
                  <img
                    src="/images/contacts/4.jpeg"
                    alt="Техническая поддержка"
                  />
                </Grid>
                <Grid item>
                  <Typography variant={'h2'}>Техническая поддержка</Typography>
                </Grid>
                <Grid item>
                  <Typography variant={'body1'} paragraph={true}>
                    tech-support@e-auc.com
                  </Typography>
                  <Typography variant={'body1'} paragraph={true}>
                    Телефон: 8-800-5553-535
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={6}>
            <Grid item xs={isSmallWidth ? 12 : 6}>
              <Typography variant={'h1'} paragraph={true}>
                FAQ
              </Typography>
              <Grid container spacing={1}>
                <Grid item>
                  <Accordion title={'Доставляет ли FoodMarket в моём городе?'}>
                    <Typography variant={'body2'}>
                      Мы осуществляем доставку по большинству регионов России.
                      Чтобы проверить, доставляем ли мы вам товар, сначала
                      зарегистрируйтесь у нас, а затем посетите домашнюю
                      страницу продуктового магазина и закажите доставку. Если
                      мы не сможем доставить товар по вашему адресу,мы объясним,
                      почему.
                    </Typography>
                  </Accordion>
                </Grid>
                <Grid item>
                  <Accordion title={'В какое время будет доставлен заказ?'}>
                    <Typography variant={'body2'}>
                      Мы осуществляем доставку по большинству регионов России.
                      Чтобы проверить, доставляем ли мы вам товар, сначала
                      зарегистрируйтесь у нас, а затем посетите домашнюю
                      страницу продуктового магазина и закажите доставку. Если
                      мы не сможем доставить товар по вашему адресу,мы объясним,
                      почему.
                    </Typography>
                  </Accordion>
                </Grid>
                <Grid item>
                  <Accordion
                    title={'Цены на сайте такие же, как и в офлайн магазинах?'}
                  >
                    <Typography variant={'body2'}>
                      Мы осуществляем доставку по большинству регионов России.
                      Чтобы проверить, доставляем ли мы вам товар, сначала
                      зарегистрируйтесь у нас, а затем посетите домашнюю
                      страницу продуктового магазина и закажите доставку. Если
                      мы не сможем доставить товар по вашему адресу,мы объясним,
                      почему.
                    </Typography>
                  </Accordion>
                </Grid>
                <Grid item>
                  <Accordion
                    title={
                      'Какие кредитные / дебетовые карты принимаются для оплаты?'
                    }
                  >
                    <Typography variant={'body2'}>
                      Мы осуществляем доставку по большинству регионов России.
                      Чтобы проверить, доставляем ли мы вам товар, сначала
                      зарегистрируйтесь у нас, а затем посетите домашнюю
                      страницу продуктового магазина и закажите доставку. Если
                      мы не сможем доставить товар по вашему адресу,мы объясним,
                      почему.
                    </Typography>
                  </Accordion>
                </Grid>
                <Grid item>
                  <Accordion title={'Какова политика возврата товаров?'}>
                    <Typography variant={'body2'}>
                      Мы осуществляем доставку по большинству регионов России.
                      Чтобы проверить, доставляем ли мы вам товар, сначала
                      зарегистрируйтесь у нас, а затем посетите домашнюю
                      страницу продуктового магазина и закажите доставку. Если
                      мы не сможем доставить товар по вашему адресу,мы объясним,
                      почему.
                    </Typography>
                  </Accordion>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={isSmallWidth ? 12 : 6}>
              <Typography variant={'h1'} paragraph={true}>
                Свяжитесь с нами
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Grid container direction={'column'} spacing={2}>
                  <Grid item xs={12}>
                    <Grid container spacing={2} alignItems={'center'}>
                      <Grid item xs={6}>
                        <Input
                          fullWidth={true}
                          id="name"
                          type="text"
                          label="Ваше имя"
                          name="name"
                          variant="outlined"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Input
                          fullWidth={true}
                          id="email"
                          type="email"
                          label="Ваш Email"
                          name="email"
                          variant="outlined"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      multiline={true}
                      rows={6}
                      rowsMax={6}
                      id="message"
                      type={'text'}
                      label="Сообщение"
                      name="message"
                      variant="outlined"
                      fullWidth
                      value={formik.values.message}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      disabled={!formik.isValid}
                      className={classes.button}
                    >
                      Отправить сообщение
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Contacts
