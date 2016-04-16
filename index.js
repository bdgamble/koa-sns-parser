const HttpError = require('http-errors');

module.exports = function snsParser() {
  return function* (next) {
    if (!this.request.body || !this.request.body.Message) {
      throw new HttpError.BadRequest('Message is a required field in the request body.');
    }

    try {
      this.state.Message = this.request.body.Message = JSON.parse(this.request.body.Message);
    } catch (e) {
      throw new HttpError.BadRequest('Message must be valid JSON', e);
    }

    yield* next;
  }
}
