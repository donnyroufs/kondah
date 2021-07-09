import express = require('express')
import { IKondahRequestData } from './types'

/*
	Dirty fix for now, because I'm not sure why it's not wrking as intenteded
	when included as a .d.ts file.
*/
declare module 'express' {
  interface Request {
    kondah: IKondahRequestData
  }
}
