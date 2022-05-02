import express, { Request, Response, Application } from 'express'
import { IKondahRequest, IKondahResponse, IKondahDriver } from '@kondah/core'

declare module '@kondah/core' {
  export interface IKondahRequest extends Request {}
  export interface IKondahResponse extends Response {}
  export interface IKondahDriver extends Application {}
}
