function convertProgress(progress) {
  if (progress === '0') {
    return 'Todo';
  } else if (progress === '1') {
    return 'Doing';
  } else {
    return 'Done';
  }
}

function getLabelColor(label) {
  switch (label) {
    case 'bug':
      return 'red';
    case 'design':
      return 'yellow';
    case 'testing':
      return 'green';
    case 'duplicate':
      return 'brown';
    case 'help wanted':
      return 'purple';
    case 'enhancement':
      return 'blue';
    case 'feature':
      return 'olive';
    case 'invalid':
      return 'black';
    case 'question':
      return 'orange';
    case 'refactor':
      return 'teal';
    default:
      return 'white';
  }
}

export { convertProgress, getLabelColor };
