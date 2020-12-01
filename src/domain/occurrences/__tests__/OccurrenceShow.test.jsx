import React from 'react';
import { TestContext } from 'react-admin';
import { render } from '@testing-library/react';

import OccurrenceShow, {
  withGuardian,
  getGuardianFullName,
  getGuardianLanguage,
  getBreadCrumbs,
  getTitle,
  getChildFullName,
  withEnrolment,
} from '../OccurrenceShow';
import Occurrence from '../Occurrence';

describe('OccurrenceShow utils', () => {
  const guardian = {
    firstName: 'Leo',
    lastName: 'Garri',
    language: 'FI',
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
        `"Esiintymä 7.10.2020 klo 00.00 - 00.30"`
      );
    });
  });

  describe('getBreadcrumbs', () => {
    it('should call Occurrence.breadcrumbs', () => {
      const occurrenceBreadcrumbsSpy = jest.spyOn(
        Occurrence.prototype,
        'breadcrumbs',
        'get'
      );

      getBreadCrumbs(occurrence);

      expect(occurrenceBreadcrumbsSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getChildFullName', () => {
    it('should return correct title', () => {
      expect(getChildFullName(guardian)).toMatchInlineSnapshot(
        `"undefined undefined"`
      );
    });
  });

  describe('withEnrolment', () => {
    it('should call otherwise if guardian does not exist', () => {
      const otherwise = jest.fn();

      withEnrolment(jest.fn(), otherwise)(null);

      expect(otherwise).toHaveBeenCalledTimes(1);
    });

    it('should call hasRecord function with a record if one exists', () => {
      const renderFunction = jest.fn();

      withEnrolment(renderFunction, jest.fn())(enrollment);

      expect(renderFunction).toHaveBeenCalledTimes(1);
      expect(renderFunction).toHaveBeenCalledWith(enrollment);
    });
  });

  describe('withGuardian', () => {
    it('should call otherwise if guardian does not exist', () => {
      const otherwise = jest.fn();

      withGuardian(jest.fn(), otherwise)({ node: null });

      expect(otherwise).toHaveBeenCalledTimes(1);
    });

    it('should call hasGuardian function with a guardian if one exists', () => {
      const renderFunction = jest.fn();

      withGuardian(renderFunction, jest.fn())(enrollment);

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
});
