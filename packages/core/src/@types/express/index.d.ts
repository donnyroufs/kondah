import express = require('express')
import { IKondahRequestData } from '../../types'

declare module 'express-serve-static-core' {
  interface Request {
    kondah: IKondahRequestData
  }
}
