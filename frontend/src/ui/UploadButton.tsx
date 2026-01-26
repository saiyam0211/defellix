import styled from 'styled-components';

interface InputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ onChange }: InputProps) => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="folder">
          <div
            className="front-side"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              // Find the sibling input and trigger click
              // (this input will be hidden visually)
              const input = document.getElementById('front-file-input');
              if (input) input.click();
            }}
          >
            <div className="tip" />
            <div className="cover" />
            <input
              id="front-file-input"
              type="file"
              style={{ display: 'none' }}
              onChange={onChange}
              tabIndex={-1}
            />
          </div>
          <div className="back-side cover" />
        </div>
        <label className="custom-file-upload">
          <input className="title" type="file" accept="image/*" onChange={onChange} />
          Upload a File
        </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    --transition: 350ms;
    --folder-W: 120px;
    --folder-H: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    /* Theme: mint + teal */
    // background: linear-gradient(135deg, #eaf7f6, #a7f3d0);
    background: transparent;
    border-radius: 15px;
    margin-top:31px;
    // box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    height: calc(var(--folder-H) * 1.7);
    position: relative;
  }

  .folder {
    position: absolute;
    top: -20px;
    left: calc(50% - 60px);
    animation: float 2.5s infinite ease-in-out;
    transition: transform var(--transition) ease;
  }

  .folder:hover {
    transform: scale(1.05);
  }

  .folder .front-side,
  .folder .back-side {
    position: absolute;
    transition: transform var(--transition);
    transform-origin: bottom center;
  }

  .folder .back-side::before,
  .folder .back-side::after {
    content: "";
    display: block;
    background-color: white;
    opacity: 0.5;
    z-index: 0;
    width: var(--folder-W);
    height: var(--folder-H);
    position: absolute;
    transform-origin: bottom center;
    border-radius: 15px;
    transition: transform 350ms;
    z-index: 0;
  }

  .container:hover .back-side::before {
    transform: rotateX(-5deg) skewX(5deg);
  }
  .container:hover .back-side::after {
    transform: rotateX(-15deg) skewX(12deg);
  }

  .folder .front-side {
    z-index: 1;
  }

  .container:hover .front-side {
    transform: rotateX(-40deg) skewX(15deg);
  }

  .folder .tip {
    background: linear-gradient(135deg, #14b8a6, #0d9488);
    width: 80px;
    height: 20px;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: -10px;
    z-index: 2;
  }

  .folder .cover {
    background: linear-gradient(135deg, #5eead4, #14b8a6);
    width: var(--folder-W);
    height: var(--folder-H);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  .custom-file-upload {
    font-size: 1.1em;
    color: #0f172a;
    text-align: center;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(20, 184, 166, 0.35);
    border-radius: 25px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background var(--transition) ease;
    display: inline-block;
    width: 130%;
    padding: 9px 35px;
    position: relative;
  }

  .custom-file-upload:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  .custom-file-upload input[type="file"] {
    display: none;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(-20px);
    }

    100% {
      transform: translateY(0px);
    }
  }`;

export default Input;
