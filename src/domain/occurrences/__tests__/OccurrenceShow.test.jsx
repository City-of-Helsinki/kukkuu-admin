import {
  withGuardian,
  getGuardianFullName,
  getGuardianLanguage,
  getGuardianPhoneNumber,
  getBreadCrumbs,
  getTitle,
  withEnrolment,
} from '../OccurrenceShow';
import Occurrence from '../Occurrence';

describe('OccurrenceShow utils', () => {
  const guardian = {
    firstName: 'Leo',
    lastName: 'Garri',
    language: 'FI',
    phoneNumber: '555-1234567',
  };
  const enrollment = {
    node: {
      child: {
        guardians: {
          edges: [
            {
              node: guardian,
            },
          ],
        },
      },
    },
  };
  const occurrence = {
    time: '2020-10-7',
    event: {
      duration: 30,
    },
  };

  describe('getTitle', () => {
    it('should return correct title', () => {
      expect(getTitle(occurrence)).toMatchInlineSnapshot(
        `"Esiintymä 7.10.2020 00.00 - 00.30"`
      );
    });
  });

  describe('getBreadcrumbs', () => {
    it('should call Occurrence.breadcrumbs', () => {
      const occurrenceBreadcrumbsSpy = vi.spyOn(
        Occurrence.prototype,
        'breadcrumbs',
        'get'
      );

      getBreadCrumbs(occurrence);

      expect(occurrenceBreadcrumbsSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('withEnrolment', () => {
    it('should call otherwise if guardian does not exist', () => {
      const otherwise = vi.fn();

      withEnrolment(vi.fn(), otherwise)(null);

      expect(otherwise).toHaveBeenCalledTimes(1);
    });

    it('should call hasRecord function with a record if one exists', () => {
      const renderFunction = vi.fn();

      withEnrolment(renderFunction, vi.fn())(enrollment);

      expect(renderFunction).toHaveBeenCalledTimes(1);
      expect(renderFunction).toHaveBeenCalledWith(enrollment);
    });
  });

  describe('withGuardian', () => {
    it('should call otherwise if guardian does not exist', () => {
      const otherwise = vi.fn();

      withGuardian(vi.fn(), otherwise)({ node: null });

      expect(otherwise).toHaveBeenCalledTimes(1);
    });

    it('should call hasGuardian function with a guardian if one exists', () => {
      const renderFunction = vi.fn();

      withGuardian(renderFunction, vi.fn())(enrollment);

      expect(renderFunction).toHaveBeenCalledTimes(1);
      expect(renderFunction).toHaveBeenCalledWith(guardian);
    });
  });

  describe('getGuardianFullName', () => {
    it('should return the full name of the guardian', () => {
      expect(getGuardianFullName(guardian)).toMatchInlineSnapshot(
        `"Leo Garri"`
      );
    });
  });

  describe('getGuardianLanguage', () => {
    it('should return the translated language of the guardian', () => {
      expect(getGuardianLanguage(guardian)).toMatchInlineSnapshot(`"suomi"`);
    });
  });

  describe('getGuardianPhoneNumber', () => {
    it('should return the phone number of the guardian', () => {
      expect(getGuardianPhoneNumber(guardian)).toMatchInlineSnapshot(
        `"555-1234567"`
      );
    });
  });
});
