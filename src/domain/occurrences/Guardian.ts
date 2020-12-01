import i18nProvider from '../../common/translation/i18nProvider';

type GuardianType = {
  firstName: string | null;
  lastName: string | null;
  language: string | null;
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
}

export default Guardian;
