import i18nProvider from '../../common/translation/i18nProvider';

type GuardianType = {
  firstName: string | null;
  lastName: string | null;
  language: string | null;
  phoneNumber: string;
};

class Guardian {
  guardian: GuardianType;

  constructor(guardian: GuardianType) {
    this.guardian = guardian;
  }

  get fullName() {
    return `${this.guardian.firstName} ${this.guardian.lastName}`.trim();
  }

  get language() {
    return i18nProvider.translate(`languages.${this.guardian.language}`);
  }

  get phoneNumber() {
    return this.guardian.phoneNumber;
  }
}

export default Guardian;
