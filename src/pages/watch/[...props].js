import { watch } from '@/api';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

import styles from './Watch.module.css'; 

export default function Watch() {
  const router = useRouter();
  const { props } = router.query;
  const [data, setData] = useState(null);
  const [quality, setQuality] = useState('480p'); 

  useEffect(() => {
    if (props) {
      watch(props)
        .then((responseData) => {
          setData(responseData);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados do episódio:', error);
        });
    }
  }, [props]);

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
  };

  return (
    <div className={styles.container}>
      <h1>Player do Episódio</h1>
      <p>Link do episódio: {props}</p>
      {data && (
        <div>
          <h2>Player de Vídeo:</h2>
          <ReactPlayer
            url={data[quality]}
            controls={true}
            width="100%"
            height="400px"
            className={styles.player}
          />
          <div>
            <h3>Qualidade:</h3>
            <div className={styles.qualityButtons}>
              <button onClick={() => handleQualityChange('1080p')} className={quality === '1080p' ? styles.active : ''}>1080p</button>
              <button onClick={() => handleQualityChange('720p')} className={quality === '720p' ? styles.active : ''}>720p</button>
              <button onClick={() => handleQualityChange('480p')} className={quality === '480p' ? styles.active : ''}>480p</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
