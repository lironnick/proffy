import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css';

const TeacherItem: React.FC = (props) => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://lh3.googleusercontent.com/ogw/ADGmqu8qGeOiWPPlvySBf6tmu5BXB1P3A50Y5dI34xyT=s83-c-mo" alt="Tiago Henrique"/>
        <div>
          <strong>Tiago Henrique</strong>
          <span>Programação</span>
        </div>
      </header>

      <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      <br /><br /> 
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 100,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;
