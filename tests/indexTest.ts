import { createParagraphWithMessage } from '../src/index';
import { expect } from 'chai';

describe('createStartMessage function', () => {
    it('should return new HTMLParagraphElement',  () => {
        const message : string = "Hello, welcome to parcel.js!";
        const startMessage : HTMLParagraphElement = createParagraphWithMessage(message);
        expect(startMessage instanceof HTMLParagraphElement).to.equal(true);
        expect(startMessage.textContent).to.equal(message);
    });
});