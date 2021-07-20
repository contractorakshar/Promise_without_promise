class promise1 {
  value;
  constructor(callbackFn) {
    this.value = "pending";
    this.promiseChain = [];
    this.resolved = this.resolved.bind(this);
    this.rejected = this.rejected.bind(this);
    callbackFn(this.resolved, this.rejected);
  }

  then(callbackFn) {
    this.promiseChain.push(callbackFn);
    return (this.value = "data");
  }

  rejected(rej) {
    console.log("rejected");
    this.value = "error";
    return this.value;
  }
  resolved(value) {
    try {
      console.log("success");
      this.value = "resolved";
      if (this.promiseChain.length) {
        this.promiseChain[0](value);
      }
      // return this.value;
    } catch (e) {
      console.log("not resolved");
    }
  }
}
const myPromise = new promise1((resolved, rejected) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      rejected("e");
    } else {
      resolved("p");
    }
  }, 1000);
});
console.log(
  myPromise.then((e) => {
    console.log(e);
    return "ak";
  })
);
