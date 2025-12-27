import { type Locator, type Page } from "@playwright/test"

export class SandboxPage {
readonly page:Page;
readonly pastaCheckBox: Locator;

constructor(page: Page){
this.page = page;
this.pastaCheckBox = page.getByLabel("Pasta 🍝")
}

async checkPasta() {
    await this.pastaCheckBox.check();
}
}

