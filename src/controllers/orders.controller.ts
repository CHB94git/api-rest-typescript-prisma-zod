import { Request, Response } from 'express'
// import { RequestExt } from '../interfaces/req-extended'
import { getCarsAuth } from '../services/orders.service'
import { handleHttpErrors } from '../utils/handle.errors'


export const getCars = async (request: Request, response: Response) => {
  try {
    const orders = await getCarsAuth()
    response.send({
      user: request.user,
      data: 'Esto solo es visible para los usuarios con session - JWT',
      orders
    })
  } catch (error) {
    handleHttpErrors(response, 'ERROR_GET_CARS_ORDERS_CONTROLLER')
  }
}