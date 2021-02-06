var calledOnce = false;

export function setCalledOnce(_calledOnce) {
  calledOnce = _calledOnce;
}

export function getCalledOnce() {
  return calledOnce;
}
