import { createParagraphWithMessage } from '../src/index';
import { expect } from 'chai';

describe('index Tests', () => {
    describe('createParagraphWithMessage', () => {
        it('should return a new HTMLParagraphElement',  () => {
            const startMessage : HTMLParagraphElement = createParagraphWithMessage("test");
            expect(startMessage instanceof HTMLParagraphElement).to.equal(true);
        });
        it('should set text to message', () => {
            const message : string = "Hello, welcome to parcel.js!";
            const startMessage : HTMLParagraphElement = createParagraphWithMessage(message);
            expect(startMessage.textContent).to.equal(message);
        })
    });
});