import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../Services/api';

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css';



function TeacherForms() {

  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ]);
  
  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems, 
      { week_day: 0, from: '', to: '' }
    ])
  }

  function setScheduleItemsValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index ) => {
      if(index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    })

    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('classes', { 
      name, 
      avatar, 
      whatsapp, 
      bio, 
      subject, 
      cost: Number(cost), 
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso');
      history.push('/');
    }).catch((error) => {
      console.log(error);
      alert('Erro no cadastro');
    });
    
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrivel que você quer dar aulas" 
        description="O primerio passo é preencher esse formulario de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input name="name" 
              label="Nome Completo" 
              value={name} 
              onChange={(e) => { setName(e.target.value) }} 
            />
            <Input 
              name="avatar" 
              label="Avatar" 
              onChange={(e) => { setAvatar(e.target.value) }} 
            />
            <Input 
              name="whatsapp" 
              label="WhatsApp" 
              onChange={(e) => { setWhatsapp(e.target.value) }} 
              />
            <Textarea 
              name="bio" 
              label="Biografia" 
              onChange={(e) => { setBio(e.target.value) }} 
              />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select 
              name="subject" 
              label="Matéria" 
              onChange={(e) => { setSubject(e.target.value) }} 
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciencia', label: 'Ciencia' },
                { value: 'Historia', label: 'Historia' }
              ]}
            />
            <Input 
              name="cost" 
              label="Custo da sua hora por aula" 
              onChange={(e) => { setCost(e.target.value) }} 
            />
          </fieldset>
          

          <fieldset>
            <legend>
              Horario Disponiveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo Horário
              </button>
            </legend>

            { scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select 
                    name="week_day" 
                    label="Dia da semana" 
                    onChange={e => setScheduleItemsValue(index, 'week_day', e.target.value)}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sabado' }
                    ]}
                  />

                  <Input 
                    name="from" 
                    label="Das" 
                    type="time" 
                    onChange={e => setScheduleItemsValue(index, 'from', e.target.value)}
                  />

                  <Input 
                    name="to" 
                    label="Time" 
                    type="time" 
                    onChange={e => setScheduleItemsValue(index, 'to', e.target.value)}
                  />
                </div>
              );
            })}
            
            
          </fieldset>
        
          <footer>
            <p>
              <img src={warningIcon} alt="Avisso importante"/>
              Importante <br />
              Preencha todos os dados
            </p>

            <button type="submit">
              Salvar cadastro
            </button>
          </footer>

        </form>
      </main>
    </div>
  );
}

export default TeacherForms;
