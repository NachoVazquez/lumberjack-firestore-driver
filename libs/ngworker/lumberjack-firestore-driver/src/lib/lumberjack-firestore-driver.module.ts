import { ModuleWithProviders, NgModule } from '@angular/core';

// tslint:disable-next-line: ordered-imports
import { AngularFireModule } from '@angular/fire';

import { LumberjackFirestoreDriverRootModule } from './lumberjack-firestore-driver-root.module';
import {
  LumberjackFirestoreDriverConfig,
  lumberjackFirestoreDriverConfigToken,
} from './lumberjack-firestore-driver.config';
import { LumberjackFirestoreDriverOptions } from './lumberjack-firestore-driver.options';

@NgModule()
export class LumberjackFirestoreDriverModule {
  /**
   * Pass a full LumberjackFirestoreDriver configuration.
   */
  static forRoot(config: LumberjackFirestoreDriverConfig): ModuleWithProviders<LumberjackFirestoreDriverRootModule> {
    const firebaseProviders = AngularFireModule.initializeApp(config.firebaseConfig).providers;

    return {
      ngModule: LumberjackFirestoreDriverRootModule,
      providers: [
        ...(firebaseProviders || []),
        {
          provide: lumberjackFirestoreDriverConfigToken,
          useValue: config,
        },
      ],
    };
  }

  /**
   * Pass options exclusive to the LumberjackFirestoreDriver configuration, but fall back on
   * the log driver config for common options.
   */
  static withOptions(
    options: LumberjackFirestoreDriverOptions,
    config: LumberjackFirestoreDriverConfig
  ): ModuleWithProviders<LumberjackFirestoreDriverRootModule> {
    const firebaseProviders = AngularFireModule.initializeApp(config.firebaseConfig).providers;

    return {
      ngModule: LumberjackFirestoreDriverRootModule,
      providers: [
        ...(firebaseProviders || []),
        {
          provide: lumberjackFirestoreDriverConfigToken,
          useValue: options,
        },
        {
          provide: lumberjackFirestoreDriverConfigToken,
          useValue: config,
        },
      ],
    };
  }

  constructor() {
    throw new Error(
      'Do not import LumberjackFirestoreDriverModule directly. Use LumberjackFirestoreDriverModule.forRoot.'
    );
  }
}
