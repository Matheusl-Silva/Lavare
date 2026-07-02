/* global React, Icon */
const { useState: useLoginState } = React;

function LoginForm() {
  const [mode, setMode] = useLoginState('signin');
  const [email, setEmail] = useLoginState('');
  const [password, setPassword] = useLoginState('');
  const [name, setName] = useLoginState('');
  const [business, setBusiness] = useLoginState('');
  const [showPw, setShowPw] = useLoginState(false);
  const [error, setError] = useLoginState(null);
  const [loading, setLoading] = useLoginState(false);

  const isSignup = mode === 'signup';
  const canSubmit = isSignup ? (email && password && name && business) : (email && password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email === 'erro@lavare.com') {
        setError('Email ou senha inválidos.');
      } else {
        setError(null);
        // would redirect in a real app
      }
    }, 700);
  };

  return (
    <div className="lv-login">
      <div className="lv-login__inner">
        <img src="../../assets/logo.svg" alt="Lavare" height="28" className="lv-login__logo" />

        <h1 className="display" style={{ fontSize: 28 }}>
          {isSignup ? 'Crie sua conta' : 'Entre na sua conta'}
        </h1>
        <p className="lv-login__sub">
          {isSignup
            ? 'Comece a gerenciar seu lava-jato em poucos minutos.'
            : 'Acesse o painel de gestão do seu lava-jato.'}
        </p>

        <form className="lv-login__form" onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <div className="lv-field">
                <label>Seu nome</label>
                <input className="lv-input" value={name} onChange={e => setName(e.target.value)} placeholder="Ex.: Roberto Mendes" autoComplete="name" />
              </div>
              <div className="lv-field">
                <label>Nome do estabelecimento</label>
                <input className="lv-input" value={business} onChange={e => setBusiness(e.target.value)} placeholder="Ex.: Lava-jato Aqua Brilho" />
              </div>
            </>
          )}

          <div className="lv-field">
            <label>Email</label>
            <input className="lv-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@empresa.com.br" autoComplete="email" />
          </div>

          <div className="lv-field">
            <div className="lv-field__row">
              <label>Senha</label>
              {!isSignup && <a href="#" className="lv-link">Esqueci minha senha</a>}
            </div>
            <div className="lv-input-suffix">
              <input className="lv-input" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={isSignup ? 'Mínimo 8 caracteres' : '••••••••'} autoComplete={isSignup ? 'new-password' : 'current-password'} />
              <button type="button" className="lv-input-suffix__btn" onClick={() => setShowPw(s => !s)} aria-label={showPw ? 'Ocultar senha' : 'Mostrar senha'}>
                <Icon name={showPw ? 'eye-off' : 'eye'} size={16} />
              </button>
            </div>
          </div>

          {error && (
            <div className="lv-alert lv-alert--danger">
              <Icon name="alert-circle" size={16} />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" className="lv-btn lv-btn--primary lv-btn--block" disabled={!canSubmit || loading}>
            {loading
              ? (<><Icon name="loader" size={16} className="lv-spin" /> Entrando…</>)
              : (isSignup ? 'Criar conta' : 'Entrar')}
          </button>

          <div className="lv-login__divider"><span>ou</span></div>

          <button type="button" className="lv-btn lv-btn--secondary lv-btn--block">
            <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.3l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.5l6.2 5.2C41.4 35.6 44 30.2 44 24c0-1.2-.1-2.4-.4-3.5z"/>
            </svg>
            Continuar com Google
          </button>
        </form>

        <div className="lv-login__toggle">
          {isSignup ? (
            <>Já tem uma conta? <a href="#" onClick={(e) => { e.preventDefault(); setMode('signin'); setError(null); }}>Entrar</a></>
          ) : (
            <>Ainda não tem uma conta? <a href="#" onClick={(e) => { e.preventDefault(); setMode('signup'); setError(null); }}>Criar conta</a></>
          )}
        </div>
      </div>
    </div>
  );
}

window.LoginForm = LoginForm;
