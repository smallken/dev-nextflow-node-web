import { Breadcrumbs, Anchor, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

interface ProfileBreadcrumbsProps {
  currentPage: 'friends' | 'team';
}

/**
 * Reusable breadcrumbs component for profile-related pages
 * @param currentPage - The current page identifier ('friends' or 'team')
 */
export function ProfileBreadcrumbs({ currentPage }: ProfileBreadcrumbsProps) {
  const router = useRouter();
  const { t } = useTranslation();

  // Determine the current page text based on the provided identifier
  const currentPageText = currentPage === 'friends' 
    ? t('friends.title') 
    : t('team.title');

  return (
    <Breadcrumbs separator="→" separatorMargin="md" mb="md">
      <Anchor onClick={() => router.push('/profile')} size="sm" fw={500}>
        {t('profile.title')}
      </Anchor>
      <Text size="sm" fw={500}>{currentPageText}</Text>
    </Breadcrumbs>
  );
}
