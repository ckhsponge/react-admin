import {
    Button,
    Dialog,
    DialogContent,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useGetIdentity, useGetList } from 'react-admin';
import { DealCardContent } from './DealCard';
import { Deal } from '../types';

export const DealArchivedList = () => {
    const { identity } = useGetIdentity();
    const {
        data: archivedLists,
        total,
        isPending,
    } = useGetList('deals', {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'archived_at', order: 'DESC' },
        filter: { sales_id: identity?.id, archived_at_neq: null },
    });
    const [openDialog, setOpenDialog] = useState(false);

    if (!identity || isPending || !total || !archivedLists) return null;

    // Group archived lists by date
    const archivedListsByDate: { [date: string]: Deal[] } =
        archivedLists.reduce(
            (acc, deal) => {
                const date = new Date(deal.archived_at).toLocaleDateString();
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(deal);
                return acc;
            },
            {} as { [date: string]: Deal[] }
        );

    return (
        <>
            <Button variant="text" onClick={() => setOpenDialog(true)}>
                View Archived List
            </Button>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                fullWidth
                maxWidth="lg"
            >
                <DialogContent>
                    <Stack gap={2}>
                        <Typography variant="h5">Archived Deals</Typography>
                        {Object.entries(archivedListsByDate).map(
                            ([date, deals]) => (
                                <Stack key={date} gap={1}>
                                    <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                    >
                                        {getRelativeTimeString(date)}
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {deals.map((deal: Deal) => (
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                key={deal.id}
                                            >
                                                <DealCardContent deal={deal} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Stack>
                            )
                        )}
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
};

export function getRelativeTimeString(
    dateString: string,
    lang = navigator.language
): string {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diff = date.getTime() - today.getTime();
    const unitDiff = Math.round(diff / (1000 * 60 * 60 * 24));

    // Check if the date is more than one week old
    if (Math.abs(unitDiff) > 7) {
        return new Intl.DateTimeFormat(lang, {
            day: 'numeric',
            month: 'long',
        }).format(date);
    }

    // Intl.RelativeTimeFormat for dates within the last week
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
    return rtf.format(unitDiff, 'day');
}
