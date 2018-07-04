export default function convertProgress(progress) {
  if (progress === '0') {
    return 'Todo';
  } else if (progress === '1') {
    return 'Doing';
  } else {
    return 'Done';
  }
}
