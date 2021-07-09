import express = require('express')
import { IKondahRequestData } from './types'

/*
	Dirty fix for now, because I'm not sure why it's not working as intended
	when included as a .d.ts file.
*/
declare module 'express' {
  interface Request {
    kondah: IKondahRequestData
  }
}
