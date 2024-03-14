import { useCallback, useState } from 'react';

export const useFilterModal = () => {
  const [openInnbetalingModal, setOpenInnbetalingModal] = useState(false);
  const [tiltakModal, setTiltakModal] = useState(false);
  const [notatModal, setNotatModal] = useState(false);
  const [foreldelseModal, setForeldelseModal] = useState(false);
  const [debitornotatModal, setDebitornotat] = useState(false);
  const [fordringModal, setFordringModal] = useState(false);
  const [skyggesakModal, setSkyggesakModal] = useState(false);
  const [ettergivelseModal, setEttergivelseModal] = useState(false);
  const [avdragsavtaleModal, setAvdragsavtaleModal] = useState(false);
  const [gjeldsordningModal, setGjeldsordningModal] = useState(false);
  const [kumulasjonModal, setKumulasjonModal] = useState(false);

  const handleOpenInnbetalingState = useCallback((val: boolean) => {
    setOpenInnbetalingModal(val);
  }, []);
  const handleTiltakModal = useCallback((val: boolean) => {
    setTiltakModal(val);
  }, []);
  const handleNotatModal = useCallback((val: boolean) => {
    setNotatModal(val);
  }, []);

  const handleForeldelseModal = useCallback((val: boolean) => {
    setForeldelseModal(val);
  }, []);
  const handleDepitorNotatModal = useCallback((val: boolean) => {
    setDebitornotat(val);
  }, []);
  const handleFordringModal = useCallback((val: boolean) => {
    setFordringModal(val);
  }, []);
  const handleSkyggesakModal = useCallback((val: boolean) => {
    setSkyggesakModal(val);
  }, []);
  const handleEttergivelseModal = useCallback((val: boolean) => {
    setEttergivelseModal(val);
  }, []);
  const handleAvdragsavtaleModal = useCallback((val: boolean) => {
    setAvdragsavtaleModal(val);
  }, []);
  const handleGjeldsordningModal = useCallback((val: boolean) => {
    setGjeldsordningModal(val);
  }, []);
  const handleKumulasjonModal = useCallback((val: boolean) => {
    setKumulasjonModal(val);
  }, []);
  return {
    depitorNotat: { handleDepitorNotatModal, debitornotatModal },
    notat: { handleNotatModal, notatModal },
    tiltak: { handleTiltakModal, tiltakModal },
    foreldelseModal: { handleForeldelseModal, foreldelseModal },
    innbetaling: { handleOpenInnbetalingState, openInnbetalingModal },
    fordring: { handleFordringModal, fordringModal },
    skyggesak: { handleSkyggesakModal, skyggesakModal },
    ettergivelse: { handleEttergivelseModal, ettergivelseModal },
    avdragsavtale: { handleAvdragsavtaleModal, avdragsavtaleModal },
    gjeldsordning: { handleGjeldsordningModal, gjeldsordningModal },
    kumulasjon: { handleKumulasjonModal, kumulasjonModal },
  };
};
