import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';

import { Mongoose, type CompileModelOptions, type Schema } from 'mongoose';

@Injectable()
export class MongooseService {
  public client: Mongoose;

  constructor(private configService: ConfigService) {
    this.client = new Mongoose({});
  }

  public async connect() {
    return this.client.connect(this.configService.getValue('mongoDBUrl'));
  }

  public async disconnect() {
    return this.client.disconnect();
  }

  public connectModel<T>(
    name: string,
    schema: Schema<T>,
    collection?: string,
    options?: CompileModelOptions,
  ) {
    return this.client.model(name, schema, collection, options);
  }
}
