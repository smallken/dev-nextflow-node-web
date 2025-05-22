import { useState } from 'react';
import { Menu, ActionIcon, Image, Group } from '@mantine/core';
import { IconLanguage, IconCheck, IconWorld } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

//   const languages: Language[] = ['en-US', 'ja-JP', 'es-ES', 'zh-CN', 'zh-TW', 'vi-VN'];

const languages = [
  { code: 'en', name: 'English', flag: '/images/flags/en.png' },
  { code: 'ja', name: '日本語', flag: '/images/flags/ja.png' },
  { code: 'es', name: 'Español', flag: '/images/flags/es.png' },
  { code: 'zh', name: '简体中文', flag: '/images/flags/zh.png' },
  { code: 'zh-TW', name: '繁體中文', flag: '/images/flags/zh-TW.png' },
  { code: 'vi', name: 'Tiếng Việt', flag: '/images/flags/vi.png' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [opened, setOpened] = useState(false);
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpened(false);
  };

  // Get current language info
  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  return (
    <Menu
      opened={opened}
      onChange={setOpened}
      width={150}
      position="bottom-end"
      shadow="md"
    >
      <Menu.Target>
        <ActionIcon 
          variant="transparent" 
          aria-label="Switch language"
          color="gray"
          size="lg"
        >
          <IconWorld size={24} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      
      <Menu.Dropdown>
        {languages.map(language => (
          <Menu.Item
            key={language.code}
            // leftSection={
            //   <Image
            //     src={language.flag}
            //     height={18}
            //     width={18}
            //     alt={language.name}
            //     fallbackSrc={`https://flagcdn.com/w20/${language.code === 'en' ? 'us' : 'cn'}.png`}
            //   />
            // }
            rightSection={
              i18n.language === language.code ? <IconCheck size={16} /> : null
            }
            onClick={() => changeLanguage(language.code)}
          >
            {language.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default LanguageSwitcher;
