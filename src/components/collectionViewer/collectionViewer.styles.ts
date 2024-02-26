export const boxStyle = {
  display: 'inline-block',
  borderColor: 'offWhite.light',
  cursor: 'pointer',
  m: 1,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.01)'
  }
};
export const coverImgBoxStyle = {
  width: '320px',
  height: '150px',
  borderRadius: '16px',
  overflow: 'hidden',
  mb: '4px',
  boxShadow: 1
};

export const imgStyle = {
  width: '100%',
  height: '100%',
  display: 'block',
  boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3)',
  objectFit: 'cover',
  objectPosition: 'top'
};
