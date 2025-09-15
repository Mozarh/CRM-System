import React, {useState, useEffect} from "react";
import {Card, Typography, message, Spin} from "antd";
import type {Profile} from "../../types/userTypes.ts";
import {getProfile} from "../../api/userApi.ts";

const { Text, Title } = Typography;

export const ProfileAccount: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile()
        setProfile(data)
      } catch (err) {
        message.error((err as Error).message);
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) {
    return <Spin tip="Идет загрузка..."></Spin>
  }

  if (!profile) {
    return <Text>Пользователя не существует</Text>
  }

  return (
    <Card
      style={{
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: 20,
        width: 300,
        padding: 10,
      }}
    >
      <Title
        style={{
          textAlign: "center",
          fontSize: "30px",
        }}
      >
        Мои данные
      </Title>
      <Title level={5}>Имя пользователя:</Title>
      <Text>{profile.username}</Text>

      <Title level={5}>Почтовый адрес:</Title>
      <Text>{profile.email}</Text>

      <Title level={5}>Телефон:</Title>
      <Text>{profile.phoneNumber}</Text>

    </Card>
  )
}