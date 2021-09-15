import LocalizationService from '../../src/services/LocalizationService';

const allMatchLocale = (localizationService, langs, matchedLang) => {
  for (const index in langs) {
    const lang = langs[index];
    const res = localizationService.getLocale(lang);
    if (typeof matchedLang === 'string') {
      expect(res).toEqual(matchedLang);
    } else {
      expect(res).toEqual(matchedLang(index, lang, res));
    }
  }
};

const vagueLangs = ['en', 'es', 'pt'];
const specificLangs = ['en_GB', 'en_US', 'es_AR', 'es_US', 'pt_BR', 'pt_PT'];
const completeLangs = [...vagueLangs, ...specificLangs];
const vagueLocales = [
  {
    language: 'en',
    messages: {
      hello: 'hello',
    },
  },
  {
    language: 'es',
    messages: {
      hello: 'hola',
    },
  },
  {
    language: 'pt',
    messages: {
      hello: 'Olá',
    },
  },
];
const specificLocales = [
  {
    language: 'en_GB',
    messages: {
      hello: 'hello',
    },
  },
  {
    language: 'en_US',
    messages: {
      hello: 'hello',
    },
  },
  {
    language: 'es_AR',
    messages: {
      hello: 'hola',
    },
  },
  {
    language: 'es_US',
    messages: {
      hello: 'hola',
    },
  },
  {
    language: 'pt_BR',
    messages: {
      hello: 'Olá',
    },
  },
  {
    language: 'pt_PT',
    messages: {
      hello: 'Olá',
    },
  },
];
const completeLocales = [...vagueLocales, ...specificLocales];

describe('LocalizationService', () => {
  it('returns the same language if an exact matching locale is found', () => {
    const langs = completeLangs;
    const localizationService = new LocalizationService(completeLocales, 'en');
    allMatchLocale(localizationService, langs, index => langs[index]);
  });

  it('returns a less specific locale if it is equal to the prefix of the requested language', () => {
    const langs = specificLangs;
    const localizationService = new LocalizationService(vagueLocales);
    allMatchLocale(localizationService, langs, (index, lang) =>
      lang.substring(0, lang.indexOf('_')),
    );
  });

  it('returns the first more specific locale if it contains the requested language as prefix', () => {
    const langs = vagueLangs;
    const localizationService = new LocalizationService(specificLocales);
    allMatchLocale(localizationService, langs, (index, lang) =>
      specificLangs.find(x => x.indexOf(lang) === 0),
    );
  });

  it("returns the locale that matches the system's language if the requested language has no matching locales", () => {
    const langs = ['es', 'es_US'];
    const userLang = 'pt_BR';
    const locales = completeLocales.filter(x => x.language.indexOf('es') !== 0);
    const localizationService = new LocalizationService(locales);
    // can we even test Platform.OS on PCs?
    LocalizationService.userLanguage = jest.fn().mockReturnValue(userLang);
    allMatchLocale(localizationService, langs, userLang);
  });

  it('returns the system locale if no locale is given', () => {
    const lang = undefined;
    const defaultLocale = 'en';
    const localizationService = new LocalizationService(
      completeLocales,
      defaultLocale,
    );
    LocalizationService.userLanguage = jest.fn().mockReturnValue('es');
    const res = localizationService.getLocale(lang);
    expect(res).toEqual('es');
  });

  it('returns the default locale if there are no matching locales and the system language is not available', () => {
    const langs = ['es', 'es_US'];
    const defaultLang = 'en';
    const locales = completeLocales.filter(x => x.language === defaultLang);
    const localizationService = new LocalizationService(locales, defaultLang);
    allMatchLocale(localizationService, langs, defaultLang);
  });

  it('returns the first locale found if nothing else matched', () => {
    const langs = ['es', 'es_US'];
    const locales = completeLocales.filter(
      x => x.language === 'en' || x.language === 'it',
    );
    const localizationService = new LocalizationService(locales, 'es');
    allMatchLocale(localizationService, langs, 'en');
  });

  it('throws an exception if there are no locales available', () => {
    const langs = ['es', 'en', 'es_US'];
    const locales = [];
    const localizationService = new LocalizationService(locales, 'en');
    for (const index in langs) {
      const lang = langs[index];
      expect(() => localizationService.getLocale(lang)).toThrow(
        'No locales found',
      );
    }
  });
});
