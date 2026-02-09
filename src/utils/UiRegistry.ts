import type { Page } from '@playwright/test';
import type { LoadedConfig } from '../config/types';
import type { Waiter } from './Waiter';
import type { ConsoleLogger } from '../logging/Logger';

import { HeaderComponent } from '../ui/components/Header.component';
import { HomePage } from '../ui/pages/Home.page';
import { ProductsPage } from '../ui/pages/Products.page';
import { ProductDetailsPage } from '../ui/pages/ProductDetails.page';
import { CartPage } from '../ui/pages/Cart.page';
import { ContactUsPage } from '../ui/pages/ContactUs.page';
import { LoginSignupPage } from '../ui/pages/LoginSignup.page';
import { SignupAccountPage } from '../ui/pages/SignupAccount.page';
import { AccountCreatedPage } from '../ui/pages/AccountCreated.page';
import { AccountDeletedPage } from '../ui/pages/AccountDeleted.page';
import { UI_KEYS } from '../config/uiKeys';

export type UiDeps = {
  page: Page;
  config: LoadedConfig;
  waiter: Waiter;
  logger: ConsoleLogger;
};

type UiKey = (typeof UI_KEYS)[keyof typeof UI_KEYS];

export class UiRegistry {
  private cache = new Map<UiKey, unknown>();

  constructor(private deps: UiDeps) {}

  private getOrCreate<T>(key: UiKey, factory: () => T): T {
    const cached = this.cache.get(key);
    if (cached) return cached as T;

    const created = factory();
    this.cache.set(key, created);
    return created;
  }

  header(): HeaderComponent {
    return this.getOrCreate(
      UI_KEYS.header,
      () =>
        new HeaderComponent(this.deps.page, this.deps.config, this.deps.waiter, this.deps.logger),
    );
  }

  home(): HomePage {
    return this.getOrCreate(
      UI_KEYS.home,
      () => new HomePage(this.deps.page, this.deps.config, this.deps.waiter, this.deps.logger),
    );
  }

  products(): ProductsPage {
    return this.getOrCreate(
      UI_KEYS.products,
      () => new ProductsPage(this.deps.page, this.deps.config, this.deps.waiter, this.deps.logger),
    );
  }

  productDetails(): ProductDetailsPage {
    return this.getOrCreate(
      UI_KEYS.productDetails,
      () =>
        new ProductDetailsPage(
          this.deps.page,
          this.deps.config,
          this.deps.waiter,
          this.deps.logger,
        ),
    );
  }

  cart(): CartPage {
    return this.getOrCreate(
      UI_KEYS.cart,
      () => new CartPage(this.deps.page, this.deps.config, this.deps.waiter, this.deps.logger),
    );
  }

  contactUs(): ContactUsPage {
    return this.getOrCreate(
      UI_KEYS.contactUs,
      () => new ContactUsPage(this.deps.page, this.deps.config, this.deps.waiter, this.deps.logger),
    );
  }

  loginSignup(): LoginSignupPage {
    return this.getOrCreate(
      UI_KEYS.loginSignup,
      () =>
        new LoginSignupPage(this.deps.page, this.deps.config, this.deps.waiter, this.deps.logger),
    );
  }

  signupAccount(): SignupAccountPage {
    return this.getOrCreate(
      UI_KEYS.signupAccount,
      () =>
        new SignupAccountPage(this.deps.page, this.deps.config, this.deps.waiter, this.deps.logger),
    );
  }

  accountCreated(): AccountCreatedPage {
    return this.getOrCreate(
      UI_KEYS.accountCreated,
      () =>
        new AccountCreatedPage(
          this.deps.page,
          this.deps.config,
          this.deps.waiter,
          this.deps.logger,
        ),
    );
  }

  accountDeleted(): AccountDeletedPage {
    return this.getOrCreate(
      UI_KEYS.accountDeleted,
      () =>
        new AccountDeletedPage(
          this.deps.page,
          this.deps.config,
          this.deps.waiter,
          this.deps.logger,
        ),
    );
  }
}
